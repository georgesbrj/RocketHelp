import firestore from '@react-native-firebase/firestore';
import {useState,useEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VStack ,Text, HStack,useTheme, ScrollView} from 'native-base';
import { Header } from '../components/Header';
import { OrderProps } from '../components/Order';
import { OrderFirestoreDTO } from '../DTOs/OrderFireStoreDTO';
import { dateFormat } from '../utils/firestoredateFormat';
import {Loading} from '../components/Loading';
import {CircleWavyCheck,Hourglass,DesktopTower,Clipboard} from  'phosphor-react-native';
import {CardDetail} from '../components/CardDetail';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from 'react-native';
 
type RouteParmas = {
  orderId: string;
}


type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string; 
}

export function Details() {
 const [isLoading,setIsLoading] = useState(true);
 const [solution,setSolution] = useState(true);
 const [order,setOrder] = useState<OrderDetails>({} as OrderDetails);
 const route = useRoute();
 const {orderId} = route.params as RouteParmas;
 const {colors } = useTheme();
 const navigation =  useNavigation();

function handleOrderClose(){
  if(!solution){
    return Alert.alert('Solicitação','Informe a solução para encerrar a solicitação')
  }

  firestore()
  .collection<OrderFirestoreDTO>('orders')
  .doc(orderId)
  .update({
    status:'closed',
    solution,
    closed_at: firestore.FieldValue.serverTimestamp()
  })
  .then(()=>{
    Alert.alert('Solicitação','Encerrada')
    navigation.goBack()
  })

  .catch((error)=> {
  console.log(error);
  Alert.alert('Solicitacao','Nao foi possivel encerrar a solicitacao')
  });

}
 


 useEffect(()=>{
  
  firestore()
   .collection<OrderFirestoreDTO>('orders')
   .doc(orderId)
   .get()
   .then((doc) => {
    
    const { patrimony, description,status,creted_at,closed_at,solution} = doc.data();
    const closed = closed_at ? dateFormat(closed_at) : null;

    setOrder({
      id: doc.id,
      patrimony,
      description,
      status,
      solution,
      when: dateFormat(creted_at),
      closed
    });

    setIsLoading(false);

  })

 },[])

if(isLoading){
   return <Loading />
}

  return (
    <VStack flex={1} bg="gray.700">
        <Header title='solicitação' />        
        <HStack   bg="gray.500" justifyContent="center" p={4}> 
           { 
              order.status === 'closed'
              ? <CircleWavyCheck  size={22} color={colors.green[300]}/>
              : <Hourglass  size={22} color={colors.secondary[700]}/>              
            }
            <Text 
              fontSize="sm"
              color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
              ml={2}
              textTransform="uppercase"
              > 
                {order.status === 'closed' ? "finalizado" : 'em andamento'}
             </Text>
        </HStack>
        <ScrollView mx={5} showsVerticalScrollIndicator={false}>
          <CardDetail 
            title='equipamento'
            description={`Patrimonio ${order.patrimony}`}
            icon={DesktopTower}
           
          />
           <CardDetail 
            title='Descrição do problema'
            description={`Patrimonio ${order.description}`}
            icon={Clipboard}  
            footer={`Registrado em ${order.when}`}         
          />
           <CardDetail 
            title='Solução'             
            icon={CircleWavyCheck}  
            description={order.solution}
            footer={order.closed && `Encerrado em ${order.closed}` }        
          >
         {
         order.status === 'open' &&
           <Input  
              placeholder='Descrição da solução'
              onChangeText={setSolution}
              h={24}
              textAlignVertical="top"
              multiline
           /> 
         }
          </CardDetail>
        </ScrollView>
        {
          !order.closed && 
             <Button 
                title='Encerrar solicitação'  
                m={5}
                onPress={handleOrderClose}
             />  
        }
    </VStack>
  );
}