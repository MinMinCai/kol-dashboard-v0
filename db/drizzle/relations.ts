import { relations } from "drizzle-orm";
import {
  aiReports,
  campaignPerformance,
  clients,
  insertionOrders,
  ioTasks,
  kolFavoriteFolderItems,
  kolFavoriteFolderShares,
  kolFavoriteFolders,
  kolSocialAccounts,
  kols,
  notifications,
  proposalFeedback,
  proposalKols,
  proposalWatchers,
  proposals,
  users,
} from "./schema";

export const clientRelations = relations(clients, ({ many }) => ({
  proposals: many(proposals),
  insertionOrders: many(insertionOrders),
}));

export const kolRelations = relations(kols, ({ many }) => ({
  socialAccounts: many(kolSocialAccounts),
  proposalLinks: many(proposalKols),
  tasks: many(ioTasks),
  performanceRows: many(campaignPerformance),
}));

export const kolSocialAccountRelations = relations(kolSocialAccounts, ({ one }) => ({
  kol: one(kols, {
    fields: [kolSocialAccounts.kolId],
    references: [kols.id],
  }),
}));

export const proposalRelations = relations(proposals, ({ one, many }) => ({
  client: one(clients, {
    fields: [proposals.clientId],
    references: [clients.id],
  }),
  proposalKols: many(proposalKols),
  feedbacks: many(proposalFeedback),
  insertionOrders: many(insertionOrders),
}));

export const proposalKolRelations = relations(proposalKols, ({ one }) => ({
  proposal: one(proposals, {
    fields: [proposalKols.proposalId],
    references: [proposals.id],
  }),
  kol: one(kols, {
    fields: [proposalKols.kolId],
    references: [kols.id],
  }),
}));

export const proposalFeedbackRelations = relations(proposalFeedback, ({ one }) => ({
  proposal: one(proposals, {
    fields: [proposalFeedback.proposalId],
    references: [proposals.id],
  }),
}));

export const insertionOrderRelations = relations(insertionOrders, ({ one, many }) => ({
  client: one(clients, {
    fields: [insertionOrders.clientId],
    references: [clients.id],
  }),
  proposal: one(proposals, {
    fields: [insertionOrders.proposalId],
    references: [proposals.id],
  }),
  tasks: many(ioTasks),
  performanceRows: many(campaignPerformance),
}));

export const ioTaskRelations = relations(ioTasks, ({ one }) => ({
  insertionOrder: one(insertionOrders, {
    fields: [ioTasks.insertionOrderId],
    references: [insertionOrders.id],
  }),
  kol: one(kols, {
    fields: [ioTasks.kolId],
    references: [kols.id],
  }),
}));

export const campaignPerformanceRelations = relations(campaignPerformance, ({ one }) => ({
  insertionOrder: one(insertionOrders, {
    fields: [campaignPerformance.insertionOrderId],
    references: [insertionOrders.id],
  }),
  kol: one(kols, {
    fields: [campaignPerformance.kolId],
    references: [kols.id],
  }),
}));

export const aiReportRelations = relations(aiReports, () => ({}));

export const userRelations = relations(users, ({ many }) => ({
  ownedFolders: many(kolFavoriteFolders),
  folderItems: many(kolFavoriteFolderItems),
  watchedProposals: many(proposalWatchers),
  notifications: many(notifications, { relationName: "recipient" }),
  triggeredNotifications: many(notifications, { relationName: "actor" }),
}));

export const kolFavoriteFolderRelations = relations(kolFavoriteFolders, ({ one, many }) => ({
  owner: one(users, {
    fields: [kolFavoriteFolders.ownerId],
    references: [users.id],
  }),
  items: many(kolFavoriteFolderItems),
  shares: many(kolFavoriteFolderShares),
}));

export const kolFavoriteFolderItemRelations = relations(kolFavoriteFolderItems, ({ one }) => ({
  folder: one(kolFavoriteFolders, {
    fields: [kolFavoriteFolderItems.folderId],
    references: [kolFavoriteFolders.id],
  }),
  kol: one(kols, {
    fields: [kolFavoriteFolderItems.kolId],
    references: [kols.id],
  }),
  addedByUser: one(users, {
    fields: [kolFavoriteFolderItems.addedBy],
    references: [users.id],
  }),
}));

export const kolFavoriteFolderShareRelations = relations(kolFavoriteFolderShares, ({ one }) => ({
  folder: one(kolFavoriteFolders, {
    fields: [kolFavoriteFolderShares.folderId],
    references: [kolFavoriteFolders.id],
  }),
  targetUser: one(users, {
    fields: [kolFavoriteFolderShares.targetUserId],
    references: [users.id],
  }),
}));

export const proposalWatcherRelations = relations(proposalWatchers, ({ one }) => ({
  proposal: one(proposals, {
    fields: [proposalWatchers.proposalId],
    references: [proposals.id],
  }),
  user: one(users, {
    fields: [proposalWatchers.userId],
    references: [users.id],
  }),
}));

export const notificationRelations = relations(notifications, ({ one }) => ({
  recipient: one(users, {
    relationName: "recipient",
    fields: [notifications.recipientId],
    references: [users.id],
  }),
  actor: one(users, {
    relationName: "actor",
    fields: [notifications.actorId],
    references: [users.id],
  }),
}));
