"""empty message

Revision ID: a0733a5cddb0
Revises: a23e63738b7a
Create Date: 2024-09-02 11:57:39.948870

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a0733a5cddb0'
down_revision = 'a23e63738b7a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('photographer_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_bookings_photographer_id_photographers'), 'photographers', ['photographer_id'], ['id'])

    with op.batch_alter_table('customers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.String(), nullable=False))

    with op.batch_alter_table('photographers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.String(), nullable=False))

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('body', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True))
        batch_op.add_column(sa.Column('updated_at', sa.DateTime(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_column('updated_at')
        batch_op.drop_column('created_at')
        batch_op.drop_column('body')

    with op.batch_alter_table('photographers', schema=None) as batch_op:
        batch_op.drop_column('password')

    with op.batch_alter_table('customers', schema=None) as batch_op:
        batch_op.drop_column('password')

    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_bookings_photographer_id_photographers'), type_='foreignkey')
        batch_op.drop_column('photographer_id')

    # ### end Alembic commands ###
