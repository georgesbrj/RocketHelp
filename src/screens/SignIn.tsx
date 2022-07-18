import {useState} from 'react';
import { Heading, VStack ,Icon,useTheme} from 'native-base';
import Logo from '../assets/logo_primary.svg';
import { Envelope,Key} from 'phosphor-react-native';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

 export function SignIn(){
 
 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');


 const {colors} = useTheme();

function handleSigIn(){
  console.log(email,password)
}

  return (
   <VStack flex={1} alignItems="center" bg="gray.600" px={9} pt={24}>
     <Logo />
     <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta   
     </Heading>
        <Input 
           marginBottom={4}
           placeholder="E-mail"
           InputLeftElement={<Icon as={<Envelope  color={colors.gray[300]} />}  marginLeft={4}/>}
            //onChangeText={text => console.log(text)}
            onChangeText={setEmail}
         />
        <Input 
           marginBottom={8}
           placeholder="Senha"
           InputLeftElement={<Icon as={<Key  color={colors.gray[300]}/>} marginLeft={4}    />}
           secureTextEntry
           onChangeText={setPassword}
        />
        <Button title="Entar" w="full" onPress={handleSigIn}/>
   </VStack>     
  );
}