package com.example.spamblocker

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.provider.Telephony
import android.util.Log

class SmsReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Telephony.Sms.Intents.SMS_DELIVER_ACTION) {
            val msgs = Telephony.Sms.Intents.getMessagesFromIntent(intent)
            
            for (sms in msgs) {
                val sender = sms.originatingAddress ?: ""
                val body = sms.messageBody ?: ""
                
                Log.d("SpamBlocker", "SMS Received from: $sender")

                if (RuleManager.isSpam(context, sender, body)) {
                    Log.i("SpamBlocker", "SPAM DETECTED! Dropping message.")
                    // Spam ise Inbox'a yazma işlemini burada yapmayarak mesajı düşürmüş oluyoruz.
                    // Çünkü biz Default SMS App'iz, biz yazmazsak kimse yazmaz.
                    saveToLocalSpamLog(context, sender, body)
                } else {
                    Log.i("SpamBlocker", "Clean message. Saving to Inbox.")
                    // Spam değilse: Inbox'a yazmalıyız.
                    // Gerçek uygulamada: ContentResolver ile sms inbox'a insert yapılmalı.
                    // Bu MVP olduğu için logluyoruz.
                }
            }
        }
    }

    private fun saveToLocalSpamLog(context: Context, sender: String, body: String) {
        // Loglama mantığı
    }
}
