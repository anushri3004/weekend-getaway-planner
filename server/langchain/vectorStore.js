import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "@langchain/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let vectorStore = null;

export async function initializeVectorStore() {
  try {
    console.log("🔄 Initializing vector store...");

    // Load all destination files from data folder
    const dataDir = path.join(__dirname, "../data");
    const files = fs.readdirSync(dataDir).filter((file) => file.endsWith(".txt"));

    if (files.length === 0) {
      throw new Error("No destination files found in data folder!");
    }

    console.log(`📁 Found ${files.length} destination files:`, files);

    // Load and process all documents
    const allDocs = [];
    for (const file of files) {
      const filePath = path.join(dataDir, file);
      const loader = new TextLoader(filePath);
      const docs = await loader.load();

      // Add metadata to identify the destination
      docs.forEach((doc) => {
        doc.metadata.source = file.replace(".txt", "");
      });

      allDocs.push(...docs);
    }

    console.log(`📄 Loaded ${allDocs.length} documents`);

    // Split documents into chunks for better retrieval
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await textSplitter.splitDocuments(allDocs);
    console.log(`✂️ Split into ${splitDocs.length} chunks`);

    // Create embeddings and vector store
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    vectorStore = await HNSWLib.fromDocuments(splitDocs, embeddings);
    console.log("✅ Vector store initialized successfully!");

    return vectorStore;
  } catch (error) {
    console.error("❌ Error initializing vector store:", error.message);
    throw error;
  }
}

export async function searchDestinations(query, numResults = 3) {
  if (!vectorStore) {
    throw new Error("Vector store not initialized. Call initializeVectorStore() first.");
  }

  try {
    const results = await vectorStore.similaritySearch(query, numResults);
    return results;
  } catch (error) {
    console.error("❌ Error searching destinations:", error.message);
    throw error;
  }
}

export function getVectorStore() {
  return vectorStore;
}