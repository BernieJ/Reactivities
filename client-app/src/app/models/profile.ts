import { User } from "./user";

export interface Profile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
    photos? : Photo[];
}

export class Profile implements Profile {
    constructor(user : User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}

export class ProfileFormValues {
    username: string = '';
    displayName: string = '';
    bio : string | undefined = '';
    

    constructor(profile: Profile) {
        if (profile) {
            this.username = profile.username;
            this.displayName = profile.displayName;
            this.bio = profile.bio;
        }
    }
} 

export interface Photo {
    id: string;
    url : string;
    isMain: boolean;
}