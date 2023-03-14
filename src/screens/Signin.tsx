import { VStack,Image, Text, Center, Heading, ScrollView, useToast } from "native-base";

import BackgoundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { useState } from "react";

type FormData = {
    email: string;
    password: string;
}

export function Signin() {
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation<AuthNavigatorRoutesProps>()
    const { singIn } = useAuth()
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>()
    const toast = useToast()

    function handleNewAccount(){
        navigation.navigate('signUp')

    }

    async function handleSignIn({email,password}: FormData){
        setLoading(true)
        try{
            await singIn(email,password)    
        }catch(error){
            const isAppError = error instanceof AppError;
            console.log(error)
            const title = isAppError ? error.message : 'Não foi possivel entrar. Tente novamente mais tarde'
            setLoading(false)
            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            })
        }
    }
    

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} showsHorizontalScrollIndicator={false}>
            <VStack flex={1} px={10} pb={16}>
                <Image
                    source={BackgoundImg}
                    defaultSource={BackgoundImg}
                    alt="Pessoas treinando"
                    resizeMode="contain"
                    position="absolute"
                />


                <Center my={24}>
                    <LogoSvg/>
                    <Text color="gray.100" fontSize="sm">
                        Treine sua mente e o seu corpo
                    </Text>
                </Center>
                
                <Center>
                    <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                        Acesse sua conta
                    </Heading>

                    <Controller
                      control={control}
                      name="email"
                      render={({field: {onChange, value}}) => (
                      <Input
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={onChange}
                        value={value}
                        errorMessage={errors.email?.message}
                      />
                    )}/>

                    <Controller control={control} name="password" render={({field: {onChange, value}}) => (
                      <Input
                        placeholder="Senha"
                        secureTextEntry
                        onChangeText={onChange} value={value}
                        errorMessage={errors.password?.message}
                      />
                    )}/>
                    <Button
                        title="Acessar"
                        onPress={handleSubmit(handleSignIn)}
                        isLoading={loading}
                    />
                </Center>

                <Center mt={24}>
                    <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
                        Aunda não tem acesso?
                    </Text>
                    <Button
                      title="Criar conta"
                      variant="outline"
                      onPress={handleNewAccount}
                    />
                </Center>


            </VStack>
        </ScrollView>
    )
}