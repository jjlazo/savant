"""empty message

Revision ID: 4d26f99b379f
Revises: 6902c95ea07e
Create Date: 2024-02-22 16:38:19.703984

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4d26f99b379f'
down_revision = '6902c95ea07e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('poems', schema=None) as batch_op:
        batch_op.add_column(sa.Column('potd', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('poems', schema=None) as batch_op:
        batch_op.drop_column('potd')

    # ### end Alembic commands ###
