import { Vote } from './vote'
export class Post {
	id: number
	picture: string
	description: string
	category_id: number
	user_id: number
	vote_score: number
	down_vote_count: number
	up_vote_count: number
	createdAt: Date
	updatedAt: Date
	downVotes: Array<Vote>
	upVotes: Array<Vote>
	Votes: Array<Vote>
}