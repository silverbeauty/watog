import { User } from './user'

export class Vote {
	id: number
	category_id: number
	post_id: number
	user_id: number
	commend: boolean
	createdAt: Date
	updatedAt: Date
	User: User
}