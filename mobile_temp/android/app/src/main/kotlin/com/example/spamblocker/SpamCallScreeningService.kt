package com.example.spamblocker

import android.telecom.Call
import android.telecom.CallScreeningService
import android.util.Log

class SpamCallScreeningService : CallScreeningService() {

    override fun onScreenCall(callDetails: Call.Details) {
        val phoneNumber = callDetails.handle.schemeSpecificPart
        Log.d("SpamBlocker", "Checking call from: $phoneNumber")

        // Kuralları kontrol et (Sadece numara bazlı)
        val isSpam = RuleManager.getRules(applicationContext).phones.contains(phoneNumber)

        val response = CallResponse.Builder()
        
        if (isSpam) {
            Log.i("SpamBlocker", "SPAM CALL DETECTED! Blocking...")
            response.setDisallowCall(true)
            response.setRejectCall(true)
            response.setSkipCallLog(true)
            response.setSkipNotification(true)
        } else {
            response.setDisallowCall(false)
            response.setRejectCall(false)
            response.setSkipCallLog(false)
            response.setSkipNotification(false)
        }

        respondToCall(callDetails, response.build())
    }
}
