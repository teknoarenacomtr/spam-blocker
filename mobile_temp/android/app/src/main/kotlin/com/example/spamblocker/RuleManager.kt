package com.example.spamblocker

import android.content.Context
import org.json.JSONObject
import java.io.File

object RuleManager {
    private const val FILENAME = "spam_rules.json"

    data class SpamRules(
        val phones: List<String>,
        val keywords: List<String>
    )

    fun getRules(context: Context): SpamRules {
        try {
            // Flutter'ın getApplicationSupportDirectory() ile yazdığı yer genellikle filesDir içindedir.
            // Bazen app_flutter klasörü altında olabilir, path kontrol edilmeli.
            // Bu örnekte filesDir root varsayıyoruz.
            val file = File(context.filesDir, FILENAME)
            
            if (!file.exists()) {
                return SpamRules(emptyList(), emptyList())
            }

            val jsonString = file.readText()
            val json = JSONObject(jsonString)
            
            val phones = mutableListOf<String>()
            val phonesArray = json.optJSONArray("phones")
            if (phonesArray != null) {
                for (i in 0 until phonesArray.length()) {
                    phones.add(phonesArray.getString(i))
                }
            }

            val keywords = mutableListOf<String>()
            val keywordsArray = json.optJSONArray("keywords")
            if (keywordsArray != null) {
                for (i in 0 until keywordsArray.length()) {
                    keywords.add(keywordsArray.getString(i))
                }
            }

            return SpamRules(phones, keywords)

        } catch (e: Exception) {
            e.printStackTrace()
            return SpamRules(emptyList(), emptyList())
        }
    }

    fun isSpam(context: Context, sender: String, messageBody: String): Boolean {
        val rules = getRules(context)
        
        // 1. Numara Kontrolü
        if (rules.phones.contains(sender)) {
            return true
        }

        // 2. Keyword Kontrolü (Case insensitive)
        val lowerBody = messageBody.lowercase()
        for (keyword in rules.keywords) {
            if (lowerBody.contains(keyword.lowercase())) {
                return true
            }
        }

        return false
    }
}
