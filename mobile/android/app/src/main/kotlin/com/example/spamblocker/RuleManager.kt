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
            // Flutter'ın getApplicationSupportDirectory() -> Android'de filesDir
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
            logBlockedItem(context, sender, messageBody, "Phone Match")
            return true
        }

        // 2. Keyword Kontrolü (Case insensitive)
        val lowerBody = messageBody.lowercase()
        for (keyword in rules.keywords) {
            if (lowerBody.contains(keyword.lowercase())) {
                logBlockedItem(context, sender, messageBody, "Keyword Match: $keyword")
                return true
            }
        }

        return false
    }

    fun logBlockedItem(context: Context, sender: String, content: String, reason: String) {
        try {
            val logFile = File(context.filesDir, "blocked_history.json")
            val existingArray = if (logFile.exists()) {
                org.json.JSONArray(logFile.readText())
            } else {
                org.json.JSONArray()
            }

            val newItem = JSONObject().apply {
                put("sender", sender)
                put("content", content)
                put("reason", reason)
                put("timestamp", System.currentTimeMillis())
            }

            // En başa ekle (yeni en üstte)
            val newArray = org.json.JSONArray()
            newArray.put(newItem)
            for (i in 0 until existingArray.length()) {
                newArray.put(existingArray.get(i))
            }

            logFile.writeText(newArray.toString())
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}
