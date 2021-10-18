export enum ExceptionMessageEnum {

    /* User exception messages */
    USER_NOT_FOUND = 'User not found',
    USER_WRONG_CREDENTIALS = 'Wrong credentials',
    USER_EXIST = 'User already exists',
    WRONG_PASSWORD_ERROR = 'Wrong password',

    /* Product exception messages */
    PRODUCTS_NOT_FOUND = 'Products not found',
    PRODUCT_NOT_FOUND = 'Product not found',
    USER_PRODUCTS_NOT_FOUND = 'User products are not found',
    PRODUCTS_NOT_EXCHANGED = "Unable to exchange products",

    /* Country exception messages */
    NO_COUNTRIES = "There are no countries",

    /* City exception messages */
    NO_CITY = "There are no cities",

    /* Likes exception messages */
    ALREADY_LIKED = 'Product already liked by this user',
    PRODUCT_NOT_LIKED = 'Product is not liked',
    LIKES_NOT_DELETED = "Unable to delete likes",

    /* Comment exception messages */
    NO_COMMENTS = 'There are no comments for this product',
    COMMENTS_NOT_DELETED = "Unable to delete comments",

    /* Save exception messages */
    ALREADY_SAVED = 'Product already saved by this user',
    NO_SAVED_PRODUCT = 'There are no saved products for this user',
    NOT_SAVED = 'Product is not saved',
    SAVES_NOT_DELETED = "Unable to delete saves",

    /* Notification exception messages */
    NO_NEW_NOTIFICATION = 'Currently there is no unseen notification',
    NO_OLD_NOTIFICATION = 'Currently there is no unseen notification',

    /* Chat exception messages */
    NO_CHAT = "There is no chat beetween two users",
    CHAT_ALREADY_EXISTS = "Chat already exists",
    NO_CHATS = "There is no chat for this user",

    /* Message exception messages */
    NO_MESSAGES = "No messages",
    NO_LAST_MESSAGES = "Unable to find last message",

    /* Offer exception messages */
    NO_SENT_OFFERS = "User has no sent offers",
    NO_RECEIVED_OFFERS = "User has no received offers",
    OFFER_DO_NOT_EXISTS = "Offer do not exists",
    NO_OFFER = "There is no offer with that id",
    CAN_NOT_UPDATE = "Can't update offer entity",
    CAN_NOT_DELETE = "Unable to delete entity",
    OFFERS_NOT_DELETED = "Unable to delete offers",
}