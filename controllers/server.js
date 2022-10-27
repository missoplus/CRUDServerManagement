const serverModel = require('../models/server');
const {now} = require("mongoose");
const groupModel = require("../models/group");
module.exports = {
    getById: async function(req, res, next) {
         console.log(req.body);
        const server  = await serverModel.find({_id : req.params.serverId , _userId: req.userId});
        if(server)
            res.json({status:"success", message: "server found!!!", data:{server: server}});
        else
            res.status(404).send();
    },
    getAll: async function(req, res, next) {
        let serversList = [];
        const servers = await serverModel.find({_userId:  req.userId});
        for (let i = 0 ; i < servers.length ; i++ ){
            serversList.push({id: servers[i]._id, name: servers[i].name});
        }
        res.json({status:"success", data:{servers: serversList}});
    },
    updateById:async function(req, res, next) {
        let server = await serverModel.find({_id : req.params.serverId , _userId:  req.userId}) ;
        if (server){
           const result=await serverModel.updateOne({name:req.body.name,port:req.body.port,ip:req.body.ip ,_groupId:req.body._groupId,_userId:req.userId,created_at : now()});
            res.json({status:"success", message: "server updated successfully!!!", data:null});
        }
        else {
            res.status(404).send();
        }
    },
    deleteById: async function(req, res, next) {
        let server = await  serverModel.findOne({_id : req.params.serverId , _userId:  req.userId}) ;
            if (server){
                const reuslt = await serverModel.findByIdAndRemove({_id : server._id})
                res.json({status:"success", message: "server deleted successfully!!!", data:null});
            }
            else {
                res.status(404).send();
            }
    },
    create: async function(req, res, next) {
        let server = await serverModel.create({ name: req.body.name,port:req.body.port,ip:req.body.ip ,_groupId:req.body._groupId,_userId:req.userId,created_at : now()});
            if (server){
                res.json({status:"success", message: "server created successfully!!!", data:null});
            }
            else {
                res.status(404).send();
            }
    },
}