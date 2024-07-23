export interface UserInterface {
    uid: string;
    displayName: string;
    photoUrl: string;
    email: string;
}

export interface RequestInterface {
    senderID: string;
    senderDisplayName: string;
    receiverID: string;
    receiverDisplayName: string;
    friends:[]
}