package com.example.spamblocker

import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import android.content.Intent
import android.provider.Telephony
import android.content.Context
import android.app.role.RoleManager
import android.os.Build

class MainActivity: FlutterActivity() {
    private val CHANNEL = "com.example.spamblocker/native"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            if (call.method == "checkPermissions") {
                val isSmsDefault = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    val roleManager = getSystemService(Context.ROLE_SERVICE) as RoleManager
                    roleManager.isRoleHeld(RoleManager.ROLE_SMS)
                } else {
                    Telephony.Sms.getDefaultSmsPackage(context) == context.packageName
                }
                
                // Call Screening is optional for "Basic Protection" but good to check
                val isCallScreening = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    val roleManager = getSystemService(Context.ROLE_SERVICE) as RoleManager
                    roleManager.isRoleHeld(RoleManager.ROLE_CALL_SCREENING)
                } else {
                    true // Pre-Q doesn't have this role in the same way
                }

                // Return true if SMS default is set (Primary requirement)
                result.success(isSmsDefault)
            } else if (call.method == "requestDefaultApp") {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    val roleManager = getSystemService(Context.ROLE_SERVICE) as RoleManager
                    if (roleManager.isRoleAvailable(RoleManager.ROLE_SMS)) {
                        val intent = roleManager.createRequestRoleIntent(RoleManager.ROLE_SMS)
                        startActivityForResult(intent, 123)
                    } else {
                        // Fallback for some devices
                        val intent = Intent(Telephony.Sms.Intents.ACTION_CHANGE_DEFAULT)
                        intent.putExtra(Telephony.Sms.Intents.EXTRA_PACKAGE_NAME, context.packageName)
                        startActivity(intent)
                    }
                } else {
                    val intent = Intent(Telephony.Sms.Intents.ACTION_CHANGE_DEFAULT)
                    intent.putExtra(Telephony.Sms.Intents.EXTRA_PACKAGE_NAME, context.packageName)
                    startActivity(intent)
                }
                result.success(null)
            } else if (call.method == "requestCallScreeningRole") {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    val roleManager = getSystemService(Context.ROLE_SERVICE) as RoleManager
                    if (roleManager.isRoleAvailable(RoleManager.ROLE_CALL_SCREENING)) {
                        val intent = roleManager.createRequestRoleIntent(RoleManager.ROLE_CALL_SCREENING)
                        startActivityForResult(intent, 124)
                    }
                }
                result.success(null)
            } else {
                result.notImplemented()
            }
        }
    }
}
