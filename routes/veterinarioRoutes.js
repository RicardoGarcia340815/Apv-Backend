import express from "express";
const router = express.Router();
import { 
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword } from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

//En este lugar iran todas la diferentes rutas que seran relacionadas a los veterinarios
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

//Area Privada
router.get("/perfil", checkAuth, perfil);//Visitamos el perfil abre el check
router.put("/perfil/:id", checkAuth, actualizarPerfil)

router.put("/actualizar-password", checkAuth, actualizarPassword)


export default router;