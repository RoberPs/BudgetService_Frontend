
import {z} from 'zod';


// ? REGISTER SCHEMAS

export const RegisterSchema = z.object({

    email: z.string()
           .min(1,{message:'El email es obligatorio'})
           .email({message:'Email no valido'}),

    name: z.string()
          .min(1,{message:'El nombre no puede ir vacio'}),

    password: z.string()
              .min(8,{message:'El password debe tener mínimo 8 caracteres'}),
    
    password_confirmation: z.string(),

}).refine((data)=> data.password === data.password_confirmation,{
    message:'Los passwords no son iguales',
    path:['password_confirmation']
})


// ? ERRORES SUCCESS
export const SuccessSchema = z.string()

export const StatusErrorSchema = z.object({
    error:z.string()
}) 



// ? TOKEN

export const TokenSchema = z.string({message:"Token no valido"})
                            .length(6,{message:'token no valido'})


// ?  SCHEMAS DE LOGIN


export const LoginSchema = z.object({
    email: z.string()
            .min(1, {message: 'El Email es Obligatorio'})
            .email( {message: 'Email no válido'}),
    password: z.string()
            .min(1, {message: 'El Password no puede ir vacio'})
})


// ? SCHEMAS DE AUTHENTICACION

export const UserAuthSchema = z.object({
    id:z.number(),
    email:z.string().email(),
    name:z.string()
})


export type UserAuth = z.infer<typeof UserAuthSchema>



export const ForgotPasswordSchema = z.object({
    email: z.string()   
            .min(1, {message: 'El Email es Obligatorio'})
            .email( {message: 'Email no válido'}),
})

// ? SCHEMA PASSWORDS

export const ResetPasswordSchema = z.object({
    password: z.string()
            .min(8, {message: 'El Password debe ser de al menos 8 caracteres'}),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"]
});

export const PasswordSchema = z.string().min(1,{message:'El password no valido'})



// * BUDGETS SCHEMAS


export const DraftBudgetSchema = z.object({
    name: z.string()
            .min(1, {message: 'El Nombre del presupuesto es obligatorio'}),
    amount: z.coerce.  // se encarga de convertir strings a numeros
            number({message: 'Cantidad no válida'})
            .min(1, {message: 'Cantidad no válida'}),
})


export const ExpenseAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    amount: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    budgetId:z.number()
})
export const BudgetAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    amount: z.string(),
    visibility:z.boolean().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.number(),
    expenses:z.array(ExpenseAPIResponseSchema) //.optional()
})

export const BudgetsApiResponseSchema = z.array(BudgetAPIResponseSchema.omit({expenses:true}))

export type Expense =z.infer<typeof ExpenseAPIResponseSchema> //Gasto completo
export type EditExpense = z.infer< typeof DraftExpenseSchema> //Gasto Solo con 2 datos 
export type Budget = z.infer<typeof BudgetAPIResponseSchema>  //Ppto completo con gastos



//EXPENSES SCHEMAS

export const DraftExpenseSchema = z.object({
    name: z.string()
            .min(1, {message: 'El Nombre del gasto es obligatorio'}),
    amount: z.coerce.  // se encarga de convertir strings a numeros
            number().min(1, {message: 'Cantidad no válida'}),
})


//PROFILE SCHEMAS

export const UpdatePasswordSchema = z.object({
    current_password: z.string()
                    .min(1,{message:'El password actual no puede ir vacio'}),
    new_password:z.string()
                    .min(8,{message:'El nuevo password debe tener al menos 8 caracteres'}),
    password_confirmation:z.string()

}).refine((data) =>data.new_password === data.password_confirmation,{
    message:'Los password no coinciden',
    path:['password_confirmation']
});


//SCHEMA PROFILE

export const ProfileFormSchema = z.object({
    name: z.string()
            .min(1, {message: 'Tu Nombre no puede ir vacio'}),
    email: z.string()
            .min(1, {message: 'El Email es Obligatorio'})
            .email({message: 'Email no válido'}),
})


