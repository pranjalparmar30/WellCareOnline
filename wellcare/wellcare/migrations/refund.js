'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Refunds', {
      refundsTransactionId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      amount_refunded: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      refund_mode: {
        type: Sequelize.ENUM('Credit Card', 'UPI'),
        allowNull: false,
      },
      refund_transaction_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      refund_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('Processed', 'Pending', 'Failed'),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Refunds');
  },
};
