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

    /* Likes exception messages */
    ALREADY_LIKED = 'Product already liked by this user',
    PRODUCT_NOT_LIKED = 'Product is not liked',

    /* Comment exception messages */
    NO_COMMENTS = 'There are no comments for this product',

    /* Save exception messages */
    ALREADY_SAVED = 'Product already saved by this user',
    NO_SAVED_PRODUCT = 'There are no saved products for this user',
    NOT_SAVED = 'Product is not saved',

    /* Notification exception messages */
    NO_NEW_NOTIFICATION = 'Currently there is no unseen notification',
    NO_OLD_NOTIFICATION = 'Currently there is no unseen notification'
}