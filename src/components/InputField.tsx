import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/core';
import { useField } from 'formik';
import { type } from 'os';
import React, { InputHTMLAttributes } from 'react'

//basically means InputField component to take any props a regular inputField would take
type InputFieldProps= InputHTMLAttributes<HTMLInputElement> & {
    label:string, name:string
} // adding this obj makes it req'd so the type wont be either or something else. thus aligning type constraints

export const InputField: React.FC<InputFieldProps> = ({label, size:_, ...props})=> { //label...props takes label out of props as label cant be assigned to Input. he strips off size from props too. this is known as destructuring. with size, he further renames it to _
    const [field,{error}]= useField(props); //all of field's info we wanna pass to Input. useField is a special formik hook
    //empty strings can be seen as false and !! casts it to type boolean. ''=>false, 'shtuf'=>true
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input {...field} {...props} id={field.name} placeholder={props.placeholder}/>
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};