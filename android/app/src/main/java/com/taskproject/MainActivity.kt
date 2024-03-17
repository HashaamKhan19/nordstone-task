package com.taskproject

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.shell.MainReactPackage
import org.devio.rn.splashscreen.SplashScreen // Import SplashScreen from react-native-splash-screen package

class MainActivity : ReactActivity(), DefaultHardwareBackBtnHandler {
    override fun getMainComponentName(): String = "taskProject"

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : ReactActivityDelegate(this, mainComponentName) {
            override fun onCreate(savedInstanceState: Bundle?) {
                SplashScreen.show(this@MainActivity) // Show splash screen
                super.onCreate(savedInstanceState)
            }

            override fun onPause() {
                super.onPause()
                val reactContext: ReactContext = reactInstanceManager.currentReactContext ?: return
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("onPause", null)
            }

            override fun onResume() {
                super.onResume()
                val reactContext: ReactContext = reactInstanceManager.currentReactContext ?: return
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("onResume", null)
            }
        }
    }

    override fun invokeDefaultOnBackPressed() {
        super.onBackPressed()
    }
}
