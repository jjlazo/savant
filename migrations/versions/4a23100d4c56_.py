"""empty message

Revision ID: 4a23100d4c56
Revises: 
Create Date: 2024-01-31 16:58:39.369135

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4a23100d4c56'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('authors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('biography', sa.String(length=500), nullable=False),
    sa.Column('posted_by', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['posted_by'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('poems',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('author_id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(), nullable=False),
    sa.Column('audio', sa.String(), nullable=True),
    sa.Column('year_published', sa.Integer(), nullable=False),
    sa.Column('posted_by', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['author_id'], ['authors.id'], ),
    sa.ForeignKeyConstraint(['posted_by'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('annotations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('line_number', sa.Integer(), nullable=False),
    sa.Column('note', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('poem_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['poem_id'], ['poems.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('authored_poems',
    sa.Column('author_id', sa.Integer(), nullable=False),
    sa.Column('poem_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['author_id'], ['authors.id'], ),
    sa.ForeignKeyConstraint(['poem_id'], ['poems.id'], ),
    sa.PrimaryKeyConstraint('author_id', 'poem_id')
    )
    op.create_table('bookmarks',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('poem_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['poem_id'], ['poems.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'poem_id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('poem_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['poem_id'], ['poems.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('downvotes',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('annotation_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['annotation_id'], ['annotations.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'annotation_id')
    )
    op.create_table('upvotes',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('annotation_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['annotation_id'], ['annotations.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'annotation_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('upvotes')
    op.drop_table('downvotes')
    op.drop_table('comments')
    op.drop_table('bookmarks')
    op.drop_table('authored_poems')
    op.drop_table('annotations')
    op.drop_table('poems')
    op.drop_table('authors')
    op.drop_table('users')
    # ### end Alembic commands ###
