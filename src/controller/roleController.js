
import roleAPIService from '../service/roleAPIService'

const readFunc = async (req, res) => {
    try {
        let data = await roleAPIService.getAllRoles();
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


const createFunc = async (req, res) => {
    try {
        let data = await roleAPIService.createNewRoles(req.body);
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

const updateFunc = async (req, res) => {
    // try {
    //     let data = await userAPIService.updateUser(req.body);
    //     return res.status(200).json({
    //         EM: data.EM, // Error Message
    //         EC: data.EC, // Error Code:
    //         DT: data.DT // Data
    //     })
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({
    //         EM: 'error from server', // Error Message
    //         EC: '-1', // Error Code:
    //         DT: '' // Data
    //     })
    // }
}
const deleteFunc = async (req, res) => {
    try {
        let data = await roleAPIService.deleteRole(req.body.id);
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

// assign roles by group
const getRolesByGroup = async (req, res) => {
    try {
        let groupId = req.params.groupId;
        let data = await roleAPIService.getRolesByGroup(groupId);
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

const assignRolesToGroup = async (req, res) => {
    try {
        let data = await roleAPIService.assignRolesToGroup(req.body);
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
    createFunc,
    updateFunc,
    deleteFunc,
    getRolesByGroup,
    assignRolesToGroup,

}