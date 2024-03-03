/**
 * Initializes the runtime for communicating with the Model Derivative service, and creates a new instance of viewer.
 * @async
 * @param {HTMLElement} container Container that will host the viewer.
 * @param {object} config Additional configuration options for the new viewer instance.
 * @returns {Promise<Autodesk.Viewing.GuiViewer3D>} New viewer instance.
 */
export function initViewer(container, config, token) {
    function getAccessToken(callback){
        callback(token);
    }
    return new Promise(function (resolve, reject) {
        Autodesk.Viewing.Initializer({ getAccessToken }, function () {
            const viewer = new Autodesk.Viewing.GuiViewer3D(container, config);
            viewer.start();
            resolve(viewer);
        })
    });
}

/**
 * Loads specific model into the viewer.
 * @param {Autodesk.Viewing.GuiViewer3D} viewer Target viewer.
 * @param {string} urn URN of the model in the Model Derivative service.
 */
export function loadModel(viewer, urn) {
    Autodesk.Viewing.Document.load(
        'urn:' + urn,
        doc => viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry()),
        (code, message, errors) => {
            console.error(code, message, errors);
            alert('Could not load model. See console for more details.');
        }
    );
}


