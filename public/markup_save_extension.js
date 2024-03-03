/**
 * Markup Extension to save markups
 */
export class MarkupSaveExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this.name = 'markup_save';
        this.saveButton = null;
    }

    /**
     * Called by the viewer once for the lifetime of the extension (unload() ends it)
     * Perform all initializations here.
     * The viewer sends `EXTENSION_LOADED_EVENT` after the load succeeds.
     * @returns {boolean} True if the load was successful. Optionally, the function can return a Promise to indicate success (resolve) or failure (reject).     * Load the extension
     */
    load() {
        super.load();
        this.viewer.addEventListener(Autodesk.Viewing.EXTENSION_ACTIVATED_EVENT,  (event) => {
            if (event.extensionId === 'Autodesk.Viewing.MarkupsGui') {
                if(this.saveButton === null){
                    this._createSaveButton();
                }
                this.saveButton.style.display = 'block';
            }
        });

        this.viewer.addEventListener(Autodesk.Viewing.EXTENSION_DEACTIVATED_EVENT,  (event) => {
            if (event.extensionId === 'Autodesk.Viewing.MarkupsGui') {
                if(this.saveButton !== null){
                    this.saveButton.style.display = 'none';
                }
            }
        });
        return true;
    }

    /**
     * Create a save button to save markups
     * @private
     */
    _createSaveButton(){
        const saveButton = document.createElement('button');
        saveButton.innerText = 'Save';
        saveButton.style.position = 'absolute';
        saveButton.style.zIndex = '100';
        saveButton.style.top = '10px';
        saveButton.style.right = '10px';
        saveButton.addEventListener('click', () => {
            console.log(this.viewer.getExtension('Autodesk.Viewing.MarkupsCore').generateData())
        });
        document.body.appendChild(saveButton);
        this.saveButton = saveButton;
    }

}

Autodesk.Viewing.theExtensionManager.registerExtension("Autodesk.Fusion.Markup.Save", MarkupSaveExtension)