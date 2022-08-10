import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";


const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true, //Validamos dentro del servidor
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null, //El telefono no es obligatorio
        trim: true
    },
    web: {
        type: String,
        default: true
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false //Cambiara a true una vez que se cambie
    }
});

veterinarioSchema.pre("save", async function(next){
    
    if(!this.isModified("password")){//SI ya esta hasheado no lo vuelvas hacer
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);
};


const Veterinario = mongoose.model("Veterinario", veterinarioSchema);//Registrara el modelo

export default Veterinario;
