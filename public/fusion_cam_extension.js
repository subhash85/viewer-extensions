/**
 * Fusion CAM Extension
 * Shows model structure on extension load and simulate CAM operations
 */
export class FusionCAMExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this.name = 'fusion_cam';
    }

    /**
     * Called by the viewer once for the lifetime of the extension (unload() ends it)
     * Perform all initializations here.
     * The viewer sends `EXTENSION_LOADED_EVENT` after the load succeeds.
     * @returns {boolean} True if the load was successful. Optionally, the function can return a Promise to indicate success (resolve) or failure (reject).     * Load the extension
     */
    load() {
        super.load();
        this.viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, this._onGeometryLoadedEvent.bind(this), {once: true});
        return true;
    }
    /**
     * Called by the viewer to notify the extension that a new model/drawing is loaded.
     * @returns {boolean} True if the model/drawing is successfully loaded.
     */
    _onGeometryLoadedEvent() {
        //this.viewer.getExtension("Autodesk.ModelStructure").activate();
        return true;
    }

    /**
     * Create a new UI panel.
     */
    _createUI() {
        const panel = new Autodesk.Viewing.UI.DockingPanel(this.viewer.container, 'SimulatePanel', "Title", { addFooter: false });
        panel.container.style.height = "200px";
        panel.container.style.width = "200px";
        panel.container.style.resize = "auto";
        panel.container.style.right = "0px";
        panel.container.style.top = "150px";
        panel.container.style.right = "50px";
        panel.container.style.zIndex = "100";
        panel.container.style.backgroundColor = "white";
        panel.container.style.overflow = "auto";
        panel.setVisible(true);
    }

    /**
     * Called by the viewer when the toolbar is created.
     */
    onToolbarCreated(toolbar) {
        super.onToolbarCreated(toolbar);
        const ctrlGroup = new Autodesk.Viewing.UI.ControlGroup('fusion_cam_control_group');
        const button = new Autodesk.Viewing.UI.Button('fusion_simulate_button');
        button.onClick = (ev) => {
            this._createUI();
        };
        button.setToolTip('Simulate');
        button.setIcon('adsk-icon-settings');
        ctrlGroup.addControl(button);
        toolbar.addControl(ctrlGroup);
    }
}

Autodesk.Viewing.theExtensionManager.unregisterExtension('Autodesk.CAM360');
Autodesk.Viewing.theExtensionManager.registerExtension("Autodesk.Fusion.CAM", FusionCAMExtension)

