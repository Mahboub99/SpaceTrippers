#version 300 es
precision highp float;

in vec3 v_view;

out vec4 color;

uniform samplerCube cube_texture_sampler;
uniform vec4 tint;


void main(){
    color = texture(cube_texture_sampler, normalize(v_view)) * tint; // Sample the cube texture from the viewing direction
}