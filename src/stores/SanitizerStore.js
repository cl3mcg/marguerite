import { defineStore } from "pinia"

export const useSanitizerStore = defineStore("sanitizerStore", {
    state: function () {
        return {
            validStep1: false,
            validStep2: false,
            validStep3: false,
            backendFileName: null,
            sheetsDetected: [],
            sheetSelectedName: null,
            sheetSelectedIndex: null,
            sheetHeaderRow: null,
            sheetHeaderRowUser: null,
        }
    },
    actions: {
        resetSanitizerStore: function () {
            this.validStep1 = false;
            this.validStep2 = false;
            this.validStep3 = false;
            this.backendFileName = null;
            this.sheetsDetected = [];
            this.sheetSelectedIndex = null;
        }
    },
});