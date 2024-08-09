// API group

import groupService from "../service/groupService"

const readFunc = async (req, res) => {
    try {
        let data = await groupService.getGroups();
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code:
            DT: data.DT // Data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', // Error Message
            EC: '-1', // Error Code:
            DT: '' // Data
        })
    }
}

module.exports = {
    readFunc,
    
}