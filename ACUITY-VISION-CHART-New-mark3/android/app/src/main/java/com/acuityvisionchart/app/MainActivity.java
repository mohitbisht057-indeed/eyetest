package com.acuityvisionchart.app;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onBackPressed() {
        if (bridge == null) {
            super.onBackPressed();
            return;
        }

        // Deliver Android/TV remote Back to the web app. The page resolves the
        // current screen first (image → topic → chart → home) instead of
        // immediately closing the activity.
        bridge.getWebView().evaluateJavascript(
            "window.dispatchEvent(new Event('capacitorBackButton'));",
            null
        );
    }
}
