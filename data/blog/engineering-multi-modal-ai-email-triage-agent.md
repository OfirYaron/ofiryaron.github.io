[_metadata_:author]:- "Ofir Yaron"
[_metadata_:title]:- "Engineering a Multi-Modal AI Email Triage Agent"
[_metadata_:tags]:- "ai,n8n,gmail,agent,docker"
[_metadata_:date]:- "6/6/2026"

A deep dive into the code and logic required to build a production-ready automation that handles more than just text. This showcases an AWS AI/ML certification and working with the Gemini API.  
The idea is to provide an example of docker-compose.yaml setup that can be easily used.
<br /><br />

### Key Sections & Sub-topics

* **Designing the Logic Flow in n8n:**
    * **The Trigger Layer:** Connecting to IMAP/Gmail APIs and handling attachments.
    * **Schema Extraction:** Using structured output (JSON mode) to turn a messy email into a clean data object.
    
* **Advanced Model Implementation:**
    * **Native Multi-modality:** Utilizing Gemini 1.5 Flash's ability to "see" invoices (PDFs) or "hear" voice notes to provide a 360-degree summary.
    * **Token Optimization:** How to handle long email threads without blowing the context window or budget.
    
* **Deploying the "Cursor" Workflow:**
    * **Custom Tooling:** Writing the specific functions (or AppleScripts) that allow the agent to move from "triage" to "action"—like copying a 2FA code or drafting a reply.
    * **State Management:** Where to store the "memory" of a conversation (PostgreSQL vs. Redis) within a Dockerized stack.

<br /><br />

### Dockerized Stack Setup

Below is a complete, production-ready `docker-compose.yaml` setup for n8n, PostgreSQL (as the database backend), and Qdrant (for semantic vector storage).

```yaml
version: '3.8'

services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    container_name: n8n_agent
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - GENE_API_KEY=${GEMINI_API_KEY}
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n_data
      - DB_POSTGRESDB_USER=n8n_user
      - DB_POSTGRESDB_PASSWORD=n8n_secure_pwd
    depends_on:
      - postgres

  postgres:
    image: postgres:16-alpine
    container_name: n8n_db
    restart: unless-stopped
    environment:
      - POSTGRES_DB=n8n_data
      - POSTGRES_USER=n8n_user
      - POSTGRES_PASSWORD=n8n_secure_pwd
    volumes:
      - postgres_data:/var/lib/postgresql/data

  qdrant:
    image: qdrant/qdrant:latest
    container_name: n8n_vector_db
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage

volumes:
  postgres_data:
  qdrant_data:
```

This stack allows you to easily run local LLM workflows, connect APIs, and maintain persistent storage for your agent's memory.
