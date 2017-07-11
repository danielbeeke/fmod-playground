class InitFmod {

    TOTAL_MEMORY = 64 * 1024 * 1024;
    gSystem = undefined;
    options = {};

    constructor (options) {
        this.options = Object.assign(this.options, options);
        FMODModule(this);
    }

    preRun () {
        console.log('prrrr')
        this.banks.forEach((fileName) => {
            console.log("Loading " + fileName);
            this.FS_createPreloadedFile('/', fileName, '/audio/' + fileName, true, false);
        });
    }

    onRuntimeInitialized () {
        let outval = {};

        this.result = this.Studio_System_Create(outval);
        this.gSystem = outval.val;

        this.result = this.gSystem.getLowLevelSystem(outval);
        this.gSystemLowLevel = outval.val;

        this.result = this.gSystemLowLevel.setDSPBufferSize(2048, 2);
        this.result = this.gSystem.initialize(1024, this.STUDIO_INIT_NORMAL, this.INIT_NORMAL, null);
        this.gSystemLowLevel.set3DSettings(1.0, .02, .02);
        // initApplication();

        // window.setInterval(updateApplication, 20);
        return this.OK;
    }

    // Simple error checking function for all FMOD return values.

    set result (result) {
        if (result !== this.OK) {
            throw this.ErrorString(result);
        }
    }

}

export default InitFmod;
