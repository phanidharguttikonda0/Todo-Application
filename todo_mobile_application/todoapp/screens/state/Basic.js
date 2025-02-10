import {atom, selector} from 'recoil' ;
import * as SecureStore from 'expo-secure-store' ;

export const viaAuthenticationAtom = atom({
    key: 'viaAuthentication',
    default: selector({
        key: 'via',
        get: async () => {
            if (await SecureStore.getItemAsync('authorization')) return false ;
            return true ;
        }
    })
}) ;