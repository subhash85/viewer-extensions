import {initViewer, loadModel} from "./viewer_utils.js"
import "./fusion_cam_extension.js";
import "./markup_save_extension.js";

const URN = "";
const TOKEN = ""

if(!URN || !TOKEN){
    alert("Please provide a URN and a token.");
}
let extensions = ['Autodesk.DocumentBrowser', 'Autodesk.Fusion.CAM', 'Autodesk.Viewing.MarkupsCore','Autodesk.Viewing.MarkupsGui', 'Autodesk.Fusion.Markup.Save'];
const viewer = await initViewer(document.getElementById('viewer'), {extensions: extensions}, TOKEN);
loadModel(viewer, URN);