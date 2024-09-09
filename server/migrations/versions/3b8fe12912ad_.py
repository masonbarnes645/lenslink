""".

Revision ID: 3b8fe12912ad
Revises: 9de0a524bd74
Create Date: 2024-09-08 21:26:26.278749

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3b8fe12912ad'
down_revision = '9de0a524bd74'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('booking_time', sa.Float(), nullable=True))
        batch_op.alter_column('booking_date',
               existing_type=sa.DATETIME(),
               type_=sa.String(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.alter_column('booking_date',
               existing_type=sa.String(),
               type_=sa.DATETIME(),
               existing_nullable=True)
        batch_op.drop_column('booking_time')

    # ### end Alembic commands ###