import Docker from 'dockerode';

const Container =require('../modules/Container');


//get all containers docker with methode ListContainers
export const GetContainers = async(req,res) =>{
    try {
        const containers = await Docker.ListContainers({all:true});
        res.status(200).json(containers);
    } catch (error) {
        throw(error);
    }
   
    
}