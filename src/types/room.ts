import { Member } from './member'
export class Room {
    room_id: string;
    room_title: string;
    room_description: string;
    room_avatar: string;
    room_country: string;
    room_job: string;
    room_topic: string;
    room_is_private: boolean;
    room_members: Array<Member>;
}