"""empty message

Revision ID: dcada12b1a01
Revises: 7e7376887274
Create Date: 2024-01-31 16:26:09.195223

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dcada12b1a01'
down_revision = '7e7376887274'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('authors', schema=None) as batch_op:
        batch_op.alter_column('biography',
               existing_type=sa.TEXT(length=2000),
               type_=sa.String(length=2000),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('authors', schema=None) as batch_op:
        batch_op.alter_column('biography',
               existing_type=sa.String(length=2000),
               type_=sa.TEXT(length=2000),
               existing_nullable=False)

    # ### end Alembic commands ###
