import { useAuth } from "@hooks/useAuth";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme, Box } from "native-base";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { Loading } from "@components/Loading";

export function Routes(){
  const {colors} = useTheme()
  const theme = DefaultTheme

  const {user, isLoadingUserStorageData} = useAuth()
  
     
  theme.colors.background = colors.gray[700]

  if(isLoadingUserStorageData){
    return <Loading />
  }

  return (
    <Box flex={1} bg="amber.700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes/> : <AuthRoutes/>}
      </NavigationContainer>
    </Box>

  )
}