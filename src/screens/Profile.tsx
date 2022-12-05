import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Center , Heading, ScrollView, Skeleton, Text, VStack } from 'native-base'
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const PHOTO_SIZE = 33;

export function Profile(){
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  return (
    <VStack flex={1}>
        <ScreenHeader title="Perfil"/>
        <ScrollView contentContainerStyle={{paddingBottom: 56}}>
          <Center mt={6} px={10}>
            {  
            photoIsLoading ?
              <Skeleton 
                  w={PHOTO_SIZE}
                  h={PHOTO_SIZE}
                  rounded={"full"}
                  startColor="gray.500"
                  endColor="gray.400"
                />
                :
                <UserPhoto
                  source={{uri: 'https://github.com/douglasscriptore.png'}}
                  alt="Foto do usuario"
                  size={PHOTO_SIZE}      
                  />
              }
            <TouchableOpacity>
              <Text color="green.500" fontFamily="heading" fontWeight="bold" fontSize="md" mt={2} mb={8}>
                Alterar foto
              </Text>
            </TouchableOpacity>

            <Input 
              placeholder="Nome"
              bg="gray.600"
            />

            <Input 
              placeholder="E-mail"
              bg="gray.600"
              isDisabled
            />

              <Heading color="gray.200" mt={12} fontSize="md" mb={2} alignSelf="flex-start">
                Alterar Senha
              </Heading>
              
              <Input 
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
              />
              <Input 
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
              />

              <Input 
                bg="gray.600"
                placeholder="confirme a nova senha"
                secureTextEntry
              />

              <Button title="Atualizar" mt={4}/>
            </Center>
        </ScrollView>
    </VStack>
  )
}