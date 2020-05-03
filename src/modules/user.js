/* 
    The user will have these:
        username String, 
        email String (they dont need to activate), 
        ingame String (one account can have up to 3 ingame),
        password String ( hashing with bcrypt),
        trans Object id (save the transaction info of this user(create another collection to do this)),
        points [{month, points}] (save the number of points this player have each month)
        rank String (display the rank this player have)
*/