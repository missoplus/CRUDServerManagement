const groupModel = require('../models/group');
module.exports = {
    getById: async function(req, res, next) {
        const group  = await groupModel.find({_id : req.params.groupId , _userId: req.userId});
        if(group)
            res.json({status:"success", message: "server found!!!", data:{group: group}});
        else
            res.status(404).send();
    },
    getAll: async function(req, res, next) {
        let groupList = [];
        const groups = await groupModel.find({_userId:  req.userId});
        for (let i = 0 ; i < groups.length ; i++ ){
            groupList.push({id: groups[i]._id, name: groups[i].name});
        }
        res.json({status:"success", data:{groups: groupList}});
    },
    updateById: async function(req, res, next) {
        let group = await groupModel.find({_id : req.params.groupId , _userId:  req.userId}) ;
        if (group){
          const result=await groupModel.updateOne({name:req.body.name})
            res.json({status:"success", message: "group updated successfully!!!", data:null});
        }
        else {
            res.status(404).send();
        }
    },
    deleteById: function(req, res, next) {
        groupModel.findByIdAndRemove(req.params.groupId, function(err, groupInfo){
            if(err)
                next(err);
            else {
                res.json({status:"success", message: "server deleted successfully!!!", data:null});
            }
        });
    },
    create: function(req, res, next) {
        groupModel.create({ name: req.body.name,_userId:req.userId}, function (err, result) {
            if (err)
                next(err);
            else
                res.json({status: "success", message: "group added successfully!!!", data: null});

        });
    },
}