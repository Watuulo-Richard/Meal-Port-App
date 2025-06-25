import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

type LoginTextInputProps = {
    label: string;
    register: any;
    name: string;
    placeholder: string;
    errors: any;
    type?: string;
    
}
export default function LoginTextInput({label, register, name, errors, type='text', placeholder}:LoginTextInputProps) {
  return (
    <div>
        <div className="grid grid-cols-1 gap-2">
            <Label htmlFor={`${name}`}>{label}</Label>
            <Input {...register(`${name}`, {required: true})} type={type} name={`${name}`} id={`${name}`} placeholder={placeholder} className='ring-1 ring-inset ring-green-300 focus:ring-0 focus:border-green-300'/>
            {errors[`${name}`] && <span className='text-xs text-red-600 text-capitalize'>{label} is required</span>}
        </div>
    </div>
  )
}
