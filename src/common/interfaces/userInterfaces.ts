import { User } from "generated/prisma";

export interface UserWithoutPassword extends Omit<User, 'password'> {}