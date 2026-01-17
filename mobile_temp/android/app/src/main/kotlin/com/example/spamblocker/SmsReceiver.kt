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
                    // Spam ise:
                    // 1. Inbox'a yazma (ContentProvider insert işlemini yapma).
                    // 2. Bildirim gösterme.
                    // 3. İstersen kendi 'spam.db'ne kaydet.
                    saveToLocalSpamLog(context, sender, body)
                } else {
                    Log.i("SpamBlocker", "Clean message. Saving to Inbox.")
                    // Spam değilse:
                    // Android Inbox Provider'a mesajı yazmalısın ki kullanıcı görebilsin.
                    // Ayrıca bildirim göstermelisin.
                    // (Bu kısım karmaşıktır, tam bir SMS client implementasyonu gerektirir)
                    // Örnek olarak burada sadece logluyoruz.
                }
            }
        }
    }

    private fun saveToLocalSpamLog(context: Context, sender: String, body: String) {
        // SharedPreferences veya yerel veritabanına log at
        // Flutter tarafı buradan okuyup "Engellenenler" listesinde gösterebilir.
    }
}
