const UserModel = require("../models/user");
const RoomModel = require("../models/room");



module.exports.chat = async(req, res) => {
        // console.log(req.session);
        console.log(req.session._id);
        const userID = req.session._id;
        const users = await UserModel.find({
            _id: { $nin: [userID] }
        });

        const rooms = await RoomModel
            .find({
                users: { $all: [userID] }
            })
            .populate({ path: "users" });
        // console.log(users, rooms, userID)
        res.render("chat", { users, rooms, userID });

    }
    // }
    // module.exports.chat = (req, res) => {

//     res.send("chat");
// }