import { useState } from 'react';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import Logo from '../assets/logo_secondary.svg';
import { SignOut,ChatTeardropText } from 'phosphor-react-native';
import Filter from '../components/Filter';
import { Order, OrderProps } from '../components/Order';
import { Button } from '../components/Button';
import { useNavigation} from '@react-navigation/native';

export function Home() {
    
    const { colors } = useTheme();
    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<OrderProps[]>([
        {
            id: '1',
            patrimony: '123344',
            when: '18/07/2022 as 10h',
            status: 'open'
        },
        {
            id: '2',
            patrimony: '123344',
            when: '18/07/2022 as 10h',
            status: 'open'
        },
        {
            id: '3',
            patrimony: '123344',
            when: '18/07/2022 as 10h',
            status: 'open'
        },
        {
            id: '4',
            patrimony: '123344',
            when: '18/07/2022 as 10h',
            status: 'open'
        },
    ]);

    const navigation = useNavigation();
    
    function handleNewOrder(){
        navigation.navigate('new')
    }

    function handleOpendetail(orderId: string){
        navigation.navigate('details',{orderId})
    }

    return (
        <VStack flex={1} pb={6} bg="gray.700">
            <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.600"
                pt={12}
                pb={5}
                px={6}
            >
                <Logo />
                <IconButton
                    icon={<SignOut size={26} color={colors.gray[300]} />}
                />

            </HStack>

            <VStack flex={1} px={6} >
                <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                    <Heading color="gray.100">
                        Meus chamados
                    </Heading>
                    <Text color="gray.200">
                        3
                    </Text>
                </HStack>

                <HStack space={3} mb={8} >
                    <Filter
                        type='open'
                        title='em andamento'
                        onPress={() => setStatusSelected('open')}
                        isActive={statusSelected === 'open'}
                    />

                    <Filter
                        type='closed'
                        title='finalizados'
                        onPress={() => setStatusSelected('closed')}
                        isActive={statusSelected === 'closed'}
                    />
                </HStack>

                <FlatList
                    data={orders}
                    keyExtractor={Item => Item.id}
                    renderItem={({ item }) => <Order data={item}  onPress={() => handleOpendetail(item.id)} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100}}
                    ListEmptyComponent={() =>  (
                       <Center>
                         <ChatTeardropText  color={colors.gray[300]} size={40}/>
                         <Text>
                            Você ainda não possui {'\n'}
                            solicitações { statusSelected === 'open' ? 'em andamento' : 'finalizadas' }
                         </Text> 
                       </Center>
                    )}
                />
                <Button 
                  title="Nova Solicitação" 
                  onPress={handleNewOrder}
                />
            </VStack>
        </VStack>
    );
}