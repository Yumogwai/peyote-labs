CREATE TABLE "chat_conversations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_activity_at" timestamp with time zone DEFAULT now() NOT NULL,
	"locale" text DEFAULT 'en' NOT NULL,
	"first_page_path" text NOT NULL,
	"detected_need" text,
	"handoff_clicked_at" timestamp with time zone,
	"budget_exhausted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conversation_id" uuid NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"page_path" text NOT NULL,
	"model_id" text,
	"latency_ms" integer
);
--> statement-breakpoint
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_conversation_id_chat_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."chat_conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "chat_conversations_last_activity_idx" ON "chat_conversations" USING btree ("last_activity_at");--> statement-breakpoint
CREATE INDEX "chat_conversations_detected_need_idx" ON "chat_conversations" USING btree ("detected_need");--> statement-breakpoint
CREATE INDEX "chat_messages_conversation_created_idx" ON "chat_messages" USING btree ("conversation_id","created_at");--> statement-breakpoint
CREATE INDEX "chat_messages_role_idx" ON "chat_messages" USING btree ("role");