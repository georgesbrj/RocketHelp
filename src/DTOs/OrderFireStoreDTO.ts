import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';


export type OrderFirestoreDTO ={
    patrimony: string;
    description: string;
    status: 'open' | 'closed';
    solution?: string;
    creted_at: FirebaseFirestoreTypes.Timestamp;
    closed_at?: FirebaseFirestoreTypes.Timestamp;

}