db = db.getSiblingDB('h2o');

db.createUser({
    user: "h2o",
    pwd: "s10p31c106",
    roles: [
        {
            role: "readWrite",
            db: "h2o"
        }
    ]
});

db.createCollection("address");
