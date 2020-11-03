//02.52.10
//in nextjs each file name is a route
import React from 'react';
import {Form, Formik} from 'formik';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router";

interface registerProps {}

/* eliminated bc we're using useRegisterMutation from graphql.tsx, this changes onSubmit's response to type <RegisterMutation>, not jsut any
what this means is that itll have autocomplete (@least thatswut ithink)
so everytime we want to add mutation/query: we add it as file into our graphql folder, run the graphql-codegen cmd which will generate a hook that we'll then use
*/
/*
const REGISTER_MUT= `
    mutation Register($username:String!,$password:String!){   //String! means the string value isnt nullable
        register(options:{username:$username, password:$password}){
        user{
            id
            username
        }
        errors{
            field
            message
        }
        }
    }
`
*/

const Register: React.FC<registerProps> = ({})=> {
    const router= useRouter(); //nextjs's router
    const [,register]= useRegisterMutation(); //special urql hook where u can input the mutation u wanna run in a string
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{username:"",password:""}} 
                onSubmit={async (values,{setErrors})=>{
                    const response= await register(values); //once u input this step, u can now view all ur backend calls in the frontend (whoa)
                    console.log(values,response);
                    if(response.data?.register.errors){ //setting tsconfig's strict=true enables optional chaining, which lets u access deeply nested ppties if data is defined, and WONT throw an error if it isnt defined. wow!
                        setErrors(toErrorMap(response.data.register.errors)); //gql returns an array of objs, but we want an obj so we'll make a util called toErrorMap that changes the structure for us. asa result, error msgs r able to be passed from graphql playground to the frontend!!!
                    } else if(response.data?.register.user){ //otherwise if registration successful, nav home
                        console.log("registration successful");
                        router.push("/");
                    }
                }}
            >
                {({isSubmitting})=>( //this is a func we pass here. which is formik's special form component that wires up our form for us
                    <Form>
                        <InputField name="username" placeholder="username" label="Username"/>
                        <Box mt={4}>
                            <InputField name="password" placeholder="password" label="Password" type="password"/>
                        </Box>
                        <Button isLoading={isSubmitting} mt={4} type="submit" variantColor='teal'>Register</Button>
                    {/*        <FormControl>
                               <FormLabel htmlFor="username">Username</FormLabel>
                               <Input value={values.username} onChange={handleChange} id="username" placeholder="username"/>
                               <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                           </FormControl> */}
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default Register; //in nextJs we have to export the default component